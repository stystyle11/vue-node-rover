# Vue-Node-Rovers

## This project is built using **Vue 3** for the frontend and **Node/Express** for the backend.

## Getting Started

To get the project up and running locally, you will need to run the following command:

docker-compose up --build

I have build the application but ran into a Docker issue when building the connection to the backend.
That is why the function:
sendPosition();
On line 269 of the Rovers Panel Component is commented out.

The logic to prevent the Rover number 2 from moving would also be added inside this logic.

## ATTENTION IMPORTANT NOTICE

My Docker for windows 10 has stopped working properly. Otherwise I would just send the position to the DB, validate it, and then to the controller and that would sucessfully complete the challenge.
I simply don't have the time atm to find the bug.
Kind regards and thank you.
