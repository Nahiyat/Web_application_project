from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

from app.websocket import game_socket


# Routes
from app.routes import auth_route
from app.routes import tournament_route
from app.routes import matchmaking_route

# Models 
from app.models import user_model
from app.models import tournament_model

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Online Chess Platform")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(auth_route.router)

app.include_router(matchmaking_route.router)

app.include_router(game_socket.router)

app.include_router(
    tournament_route.router,
    prefix="/api/tournaments",
    tags=["Tournament"]
)

# Health Check
@app.get("/health")
def health():
    return {"status": "ok"}

# Root
@app.get("/")
def root():
    return {
        "message": "Chess API is running"
    }
