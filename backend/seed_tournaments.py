from app.core.database import SessionLocal, Base, engine
from app.models.tournament_model import Tournament

# Create table if it doesn't exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear old tournament data (optional)
db.query(Tournament).delete()

tournaments = [

    Tournament(
        name="Monmohon International Invitational FIDE Rating Chess Tournament",
        tournament_type="Offline",
        city="Dhaka",
        venue="Bangladesh Chess Federation Hall",
        start_date="2026-07-17",
        end_date="2026-07-20",
        start_time="03:00 PM",
        organizer="Bangladesh Chess Federation",
        players=86,
        max_players=120,
        status="Open",
    ),

    Tournament(
        name="ZIA International FIDE Rapid Rating Chess Tournament",
        tournament_type="Offline",
        city="Dhaka",
        venue="Bangladesh Chess Federation Hall",
        start_date="2026-08-14",
        end_date="2026-08-14",
        start_time="03:00 PM",
        organizer="Bangladesh Chess Federation",
        players=57,
        max_players=100,
        status="Open",
    ),

    Tournament(
        name="SSPL International Open FIDE Rating Chess Tournament",
        tournament_type="Offline",
        city="Dhaka",
        venue="BCF Hall",
        start_date="2026-09-05",
        end_date="2026-09-10",
        start_time="10:00 AM",
        organizer="Bangladesh Chess Federation",
        players=72,
        max_players=150,
        status="Open",
    ),

    Tournament(
        name="Bangladesh National Chess Championship",
        tournament_type="Offline",
        city="Dhaka",
        venue="BCF Hall",
        start_date="2026-10-01",
        end_date="2026-10-08",
        start_time="10:00 AM",
        organizer="Bangladesh Chess Federation",
        players=110,
        max_players=150,
        status="Open",
    ),

    Tournament(
        name="Sylhet Open Rapid Chess Tournament",
        tournament_type="Offline",
        city="Sylhet",
        venue="Sylhet District Stadium",
        start_date="2026-08-28",
        end_date="2026-08-28",
        start_time="10:00 AM",
        organizer="Sylhet Chess Association",
        players=42,
        max_players=80,
        status="Open",
    ),

    Tournament(
        name="Khulna Open Chess Tournament",
        tournament_type="Offline",
        city="Khulna",
        venue="Khulna Club",
        start_date="2026-09-12",
        end_date="2026-09-13",
        start_time="09:00 AM",
        organizer="Khulna Chess Association",
        players=38,
        max_players=80,
        status="Open",
    ),

    Tournament(
        name="Rajshahi FIDE Rapid",
        tournament_type="Offline",
        city="Rajshahi",
        venue="Rajshahi Club",
        start_date="2026-09-20",
        end_date="2026-09-20",
        start_time="10:00 AM",
        organizer="Rajshahi Chess Association",
        players=55,
        max_players=100,
        status="Open",
    ),

    Tournament(
        name="Chattogram Open Chess Championship",
        tournament_type="Offline",
        city="Chattogram",
        venue="Chattogram Club",
        start_date="2026-10-12",
        end_date="2026-10-15",
        start_time="09:00 AM",
        organizer="Chattogram Chess Association",
        players=60,
        max_players=120,
        status="Open",
    ),

    Tournament(
        name="Barisal Rapid Chess Tournament",
        tournament_type="Offline",
        city="Barisal",
        venue="Barisal Club",
        start_date="2026-11-01",
        end_date="2026-11-01",
        start_time="10:00 AM",
        organizer="Barisal Chess Association",
        players=31,
        max_players=60,
        status="Open",
    ),

    Tournament(
        name="Rangpur Open Chess Tournament",
        tournament_type="Offline",
        city="Rangpur",
        venue="Rangpur Stadium",
        start_date="2026-11-08",
        end_date="2026-11-09",
        start_time="09:30 AM",
        organizer="Rangpur Chess Association",
        players=40,
        max_players=80,
        status="Open",
    ),

    Tournament(
        name="Cumilla Chess Festival",
        tournament_type="Offline",
        city="Cumilla",
        venue="Cumilla Town Hall",
        start_date="2026-11-15",
        end_date="2026-11-17",
        start_time="10:00 AM",
        organizer="Cumilla Chess Association",
        players=48,
        max_players=100,
        status="Open",
    ),

    Tournament(
        name="Mymensingh Open Rapid",
        tournament_type="Offline",
        city="Mymensingh",
        venue="Circuit House",
        start_date="2026-11-22",
        end_date="2026-11-22",
        start_time="10:00 AM",
        organizer="Mymensingh Chess Association",
        players=37,
        max_players=80,
        status="Open",
    ),

    Tournament(
        name="Noakhali FIDE Open",
        tournament_type="Offline",
        city="Noakhali",
        venue="District Sports Complex",
        start_date="2026-12-03",
        end_date="2026-12-06",
        start_time="09:00 AM",
        organizer="Noakhali Chess Association",
        players=50,
        max_players=100,
        status="Open",
    ),

    Tournament(
        name="Bogura Open Chess Championship",
        tournament_type="Offline",
        city="Bogura",
        venue="Bogura Club",
        start_date="2026-12-10",
        end_date="2026-12-12",
        start_time="09:00 AM",
        organizer="Bogura Chess Association",
        players=46,
        max_players=90,
        status="Open",
    ),

    Tournament(
        name="Dinajpur Rapid Chess",
        tournament_type="Offline",
        city="Dinajpur",
        venue="Dinajpur Club",
        start_date="2026-12-18",
        end_date="2026-12-18",
        start_time="10:00 AM",
        organizer="Dinajpur Chess Association",
        players=28,
        max_players=60,
        status="Open",
    ),

    Tournament(
        name="Jessore Open Chess",
        tournament_type="Offline",
        city="Jessore",
        venue="Jessore Town Hall",
        start_date="2027-01-08",
        end_date="2027-01-10",
        start_time="09:00 AM",
        organizer="Jessore Chess Association",
        players=41,
        max_players=80,
        status="Open",
    ),

    Tournament(
        name="Faridpur Chess Championship",
        tournament_type="Offline",
        city="Faridpur",
        venue="Faridpur Club",
        start_date="2027-01-16",
        end_date="2027-01-17",
        start_time="10:00 AM",
        organizer="Faridpur Chess Association",
        players=29,
        max_players=60,
        status="Open",
    ),

    Tournament(
        name="Pabna Rapid Tournament",
        tournament_type="Offline",
        city="Pabna",
        venue="Pabna Auditorium",
        start_date="2027-01-24",
        end_date="2027-01-24",
        start_time="10:00 AM",
        organizer="Pabna Chess Association",
        players=32,
        max_players=70,
        status="Open",
    ),

    Tournament(
        name="Narayanganj Open Chess",
        tournament_type="Offline",
        city="Narayanganj",
        venue="Narayanganj Club",
        start_date="2027-02-05",
        end_date="2027-02-07",
        start_time="09:30 AM",
        organizer="Narayanganj Chess Association",
        players=54,
        max_players=100,
        status="Open",
    ),

    Tournament(
        name="Dhaka Winter Chess Festival",
        tournament_type="Offline",
        city="Dhaka",
        venue="BCF Hall",
        start_date="2027-02-20",
        end_date="2027-02-24",
        start_time="10:00 AM",
        organizer="Bangladesh Chess Federation",
        players=95,
        max_players=150,
        status="Open",
    ),
]

db.add_all(tournaments)
db.commit()

print(f"{len(tournaments)} tournaments inserted successfully.")

db.close()
