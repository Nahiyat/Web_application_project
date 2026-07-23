from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_route#, user_routes, game_routes
from app.core.database import Base, engine


app = FastAPI(title="Online Chess Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
Base.metadata.create_all(bind=engine)

app.include_router(auth_route.router)
#app.include_router(user_routes.router)
#app.include_router(game_routes.router)

@app.get("/health")
def health():
    return {"status": "ok"}