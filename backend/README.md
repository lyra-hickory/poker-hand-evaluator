# PokerHandEvaluator Backend
This project is built using Python and FastAPI.

## Development server

### Setting up your venv
Prerequisites for this project to be installed on the machine:
- Python 3.14
- PIP 25.3

It is best practice to instantiate a virtual environment (venv)

You can do this by first creating the venv:

```bash
python -m venv /path/to/new/virtual/environment/.venv
```

Enabling the venv (given we are in the folder our .venv folder is located in)

Microsoft:
```bash
.venv/Scripts/Activate.ps1
```

Unix:*
```bash
source .venv/bin/activate
```

'* I didn't test this command locally as I don't have a unix machine on-hand

### Installing required packages
FastAPI is a dependency for this project. 
After you've activated your venv you can install it with pip.

```bash
pip install "fastapi[standard]"
```

Please note: in order to run the server with the `fastapi` command you need to install the package as described above. `pip install fastapi` will only install it as a package but not enable the cli command.

### Running the server
After you've activated your virtual environment move to the backend folder

```bash
cd backend
```

Then you can simply activate it with
```bash
fastapi dev src/main.py
```

## Running unit tests
The unit tests for this project is written using the built-in Python package `unittests`.

As such you can easily run them with the following command, 
given you are in the `/backend/` folder

```bash
python -m unittest src/tests/test_evaluate_hand.py
```
