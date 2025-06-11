from fastapi import FastAPI, Request, Form, Depends, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import JSONResponse
import sqlite3
import joblib
import os

app = FastAPI()

# Setup
app.add_middleware(SessionMiddleware, secret_key='secret_key_demo')
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Database setup
def get_db():
    conn = sqlite3.connect("database.db")
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
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
def login(request: Request, username: str = Form(...), password: str = Form(...)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    if user:
        request.session["user"] = username
        return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse("login.html", {"request": request, "message": "Login gagal"})

# Route: halaman register
@app.get("/register", response_class=HTMLResponse)
def register_form(request: Request):
    return templates.TemplateResponse("register.html", {"request": request, "message": ""})

@app.post("/register")
def register(request: Request, username: str = Form(...), password: str = Form(...)):
    conn = get_db()
    try:
        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    except sqlite3.IntegrityError:
        return templates.TemplateResponse("register.html", {"request": request, "message": "Username sudah ada"})

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
    model = joblib.load("diabetes_risk_model.sav")
    input_data = [[
        data['age'],
        data['bmi'],
        data['glucose_level'],
        data['family_history'],
        data['smoker']
    ]]
    probability = model.predict_proba(input_data)[0][1]
    risk_level = "Risiko Tinggi" if probability > 0.5 else "Risiko Rendah"
    return JSONResponse(content={
        "risk_level": risk_level,
        "probability": round(float(probability), 2)
    })
