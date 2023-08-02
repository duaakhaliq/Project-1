# Project - User Authentication System

## How to Run

### Step 1: Register User
First, you need to add user data into the database. There are 6 fields to fill up:
- Name
- Email
- Password
- Confirm Password

Fill in this information using JSON format on this API: http://localhost:3000/auth/signup. This action will add the user into the database.

### Step 2: Login User
On this API: http://localhost:3000/auth/signin, users can log in by entering their name and password using JSON format. After obtaining the access token, users can also log in using the bearer token method.

### Step 3: Profile View
On this API: http://localhost:3000/auth/profile, you can check the user's ID and username by putting the token into the bearer token method.

### Step 4: Logout
By using this API: http://localhost:3000/auth/signout, you can log out the user. After logout, you will not be able to get user data when using Step 3 (Profile View). However, if you log in again, you will be able to find user data in the profile.

## Description

[Nest](https://github.com/nestjs/nest) is a progressive Node.js framework for building efficient and scalable server-side applications.

## Installation

```bash
$ npm install
