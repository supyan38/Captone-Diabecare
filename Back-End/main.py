from fastapi import FastAPI, Request, Form, Depends, status, Body
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import JSONResponse
import sqlite3
import joblib
import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Body

app = FastAPI()

# Middleware supaya bisa diakses frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key='secret_key_demo')
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Database setup
def get_db():
    conn = sqlite3.connect("database.db")
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT,
            usia INTEGER,
            email TEXT UNIQUE,
            password TEXT
        )
    ''')
    return conn

# Middleware autentikasi
def is_authenticated(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse(url='/login', status_code=status.HTTP_302_FOUND)
    return user

# Route: halaman login
@app.get("/login", response_class=HTMLResponse)
def login_form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "message": ""})

@app.post("/login")
async def login(request: Request, email: str = Form(...), password: str = Form(...)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=? AND password=?", (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        request.session["user"] = {
            "id": user[0],
            "nama": user[1],
            "usia": user[2],
            "email": user[3]
        }
        return {"success": True}
    
    return {"success": False, "message": "Login gagal"}


# Route: halaman register
@app.get("/register", response_class=HTMLResponse)
def register_form(request: Request):
    return templates.TemplateResponse("register.html", {"request": request, "message": ""})

@app.post("/register")
def register(
    request: Request,
    nama: str = Form(...),
    usia: int = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (nama, usia, email, password) VALUES (?, ?, ?, ?)",
            (nama, usia, email, password)
        )
        conn.commit()
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    except sqlite3.IntegrityError:
        return templates.TemplateResponse(
            "register.html", {"request": request, "message": "Username sudah ada"}
        )

# Route: logout
@app.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)

# Route: dashboard / index
@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request, user: str = Depends(is_authenticated)):
    return templates.TemplateResponse("index.html", {"request": request, "user": user})

# Route: prediksi POST API
@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    model = joblib.load("best_model_diabetes_risk.sav")

    physical_map = {"rendah": 0, "sedang": 1, "tinggi": 2}
    yesno_map = {"ya": 1, "tidak": 0}
    gender_map = {"laki-laki": 1, "perempuan": 0}

    age_norm = float(data['age']) / 100
    bmi_norm = float(data['bmi']) / 50
    glucose_norm = float(data['glucose_level']) / 200

    input_data = np.array([[ 
        age_norm,
        bmi_norm,
        glucose_norm,
        physical_map.get(data['physical_activity'].lower(), 0),
        yesno_map.get(data['family_history'].lower(), 0),
        yesno_map.get(data['smoker'].lower(), 0),
        gender_map.get(data['gender'].lower(), 0)
    ]])

    probability = model.predict(input_data)[0][0] 

    risk_level = "Risiko Tinggi" if probability > 0.5 else "Risiko Rendah"

    return JSONResponse(content={
        "risk_level": risk_level,
        "probability": round(float(probability), 2)
    })

# Buat rute profile agar sama frontend
@app.get("/profile")
def profile(request: Request):
    user = request.session.get("user")
    if not user:
        return JSONResponse(status_code=401, content={"message": "Belum login"})
    return user

@app.post("/profile/update")
def update_profile(request: Request, nama: str = Form(...), usia: int = Form(...)):
    user = request.session.get("user")
    if not user:
        return JSONResponse(status_code=401, content={"message": "Belum login"})

    conn = get_db()
    conn.execute("UPDATE users SET nama=?, usia=? WHERE id=?", (nama, usia, user["id"]))
    conn.commit()
    conn.close()

    user["nama"] = nama
    user["usia"] = usia
    request.session["user"] = user
    return {"success": True}



