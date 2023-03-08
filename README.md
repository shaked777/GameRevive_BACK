# GameRevive

Welcome to our Used Games Online Store! This is a web application built using Django for the backend and React for the frontend. The application allows users to browse and purchase used games, with AI recommend system and payment handled securely through the Stripe payment gateway.

## Features
- Search for games by title
- Add games to your cart and check out securely through Stripe
- View your order and manage your account
- Get personalized game recommendations using our AI-based recommendation system

## Technologies Used
- Django
- Django Rest Framework
- PostgreSQL
- React
- Redux
- Bootstrap
- Stripe
- scikit-learn

## Installation
To run this application on your local machine, you will need to have Python, Node.js, and PostgreSQL installed.

1. Clone the repository to your local machine
2. Set up a virtual environment for the backend using `python -m venv env`
3. Activate the virtual environment using `source env/bin/activate`
4. Install the backend dependencies using `pip install -r requirements.txt`
5. Set up the database using `python manage.py migrate`
6. Create a superuser account using `python manage.py createsuperuser`
7. Set up a `.env` file with your Stripe API key and other environment variables
8. Install the frontend dependencies using `npm install`
9. Start the backend server using `python manage.py runserver`
10. The FRONT is inside this project.


## AI-Based Recommendation System
Our online store uses an AI-based recommendation system to provide personalized game recommendations to users. This recommendation system is powered by state-of-the-art machine learning algorithms that analyze user behavior and preferences to suggest games that are likely to be of interest.

The recommendation system is built using Python and is integrated into the Django backend. The system uses advanced data analysis techniques and machine learning models from the scikit-learn library to learn from user interactions and provide personalized game recommendations in real-time.





# Game On  🎮

