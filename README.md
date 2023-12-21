# chatanony
Anonymous Chat App

ChatAnony is an open source, anonymous conversation platform built with Django Rest Framework, ReactJs with WebSockets - Channels that enable realtime chats

Doesn't require User Accounts or Trackings.

Check the Live Site here: <a href = "https://chatanony.netlify.app/">https://chatanony.netlify.app</a>

## Installation
```bash
git clone https://github.com/Crane04/chatanony.git
cd chatanony
```
To run this project locally, you will need to have (Python and Django) and NodeJs installed.

### Running The Backend
```bash
cd backend
```

- **Set Up Virtual Environment (Optional but Recommended):**
  - If you prefer to work in a virtual environment, create and activate it:
```bash
python -m venv venv       # Create virtual environment
source venv/bin/activate  # Activate on macOS and Linux
workon venv     # Activate on Windows
```
- **Install Dependencies:**
  - Install the required packages for the project:

```bash
pip install -r requirements.txt
```
- **Start the Development Server:**
  - Run the Django development server to launch the server:

```bash
python manage.py runserver
```
The backend will now be running in port 8000 if everything is configured correctly.

### Running The Backend
You must have node js installed.
```bash
cd frontend
```

- **Install Dependencies**
```bash
  npm install
```

- **Start the server**
```bash
  npm run dev
```
The frontend will now be running in port 5173 if everything is configured correctly

## Contributing
- We welcome contributions to this project! To contribute:
  Fork the repository.

  - Create a new branch: git checkout -b feature-new-feature
  - Make your changes and commit them: git commit -m "Add new feature"
  - Push to the branch: git push origin feature-new-feature
  - Create a pull request with a detailed description of your changes.

## Contact

- **If you have any questions or feedback, feel free to reach out at mayowayusuf3004@gmail.com**
