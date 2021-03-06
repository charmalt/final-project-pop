# RetroMail POP Server

[Summary](#summary) | [Specification](#specification) | [Getting started](#getting-started) | [Approach](#approach) | [More](#further-development)

## Summary

A Javascript application that mimics the core functionality of a POP3 mail server. The application implements a custom POP3 protocol to allow mail clients to request a users messages from a central database.

It builds upon the [Net](https://nodejs.org/api/net.html) Node.js module which provides an API for creating stream-based TCP servers and clients. The app can be run using Node.js and will log server events such as clients connections, disconnections and the messages it receives.

## Specification

### Requirements

The primary requirement was to mimic a simple POP3 server that would implement a handshake with a mail client, following this sequence:

```
   ========                         ========
  |        |------- HELLO -------->|        |
  |        |<------- 250 ----------|        |
  |        |                       |        |
  |        |-- USER <username> --->|        |
  |        |<------- 250 ----------|        |
  | CLIENT |                       |  POP3  |
  |        |--- MessageRequest --->|        |
  |        |<----- Messages -------|        |
  |        |                       |        |
  |        |-------- QUIT -------->|        |
  |        |<------- 331 ----------|        |
   ========                         ========

```
The key features required were:
* A server that could accept connections over TCP
* Implementation of the handshake shown above
* Ability to connect to a database both locally or hosted in the cloud
* Logging of key server events (Client connections, client disconnections, messages from clients, server start & server close)

**Further information on POP3 servers can be found [here](https://en.wikipedia.org/wiki/Post_Office_Protocol)**

### Acceptance Criteria

* Server starts and logs start
* Server allows connections of client over TCP and logs it
* Server and client can exchange messages through the correct handshake sequence
* Only emails for the specified USER are returned
* Server connects with and can pull messages from a database
* Server closes and logs closing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This requires Node.js to run it and npm as the package manager to simplify the build process and include all necessary dependencies. If you do not have Node installed it is recommended you do so ([Node](https://nodejs.org/en/download/)).

### Installing

To get started please follow the subsequent steps.

```
$ git clone https://github.com/charmalt/final-project-pop.git
$ cd <repo name>
$ npm install
```

The app can be run using the app.js file in the root, however this will attempt to connect the server to a production database which in our case was a PostgresSQL database hosted on an AWS EC2 instance. If you would like to have a similar cloud hosted database then you will need to set this up yourself as this is beyond the scope of these instructions. If you choose to go down this root then you will also need to create a .env file in the root of the repository. You will then need to insert the database connection string into this file in a similar format to below.
```
// /.env

PGPROD="postgres://<USERNAME>:<PASSWORD>@<ADDRESS>:<PORT>/mailbox"
```

If you do not wish to set up a remote database then you can use a local instance of PostgreSQL. If you do not have Postgres set up on you computer already then you can follow these steps.

#### 1. Use Homebrew to install the package

We can use the package manager [Homebrew](https://docs.brew.sh/Installation) to start the install of PostgreSQL:

```sh
$> brew install postgresql
```

After Homebrew has downloaded PostgreSQL it will show you some installation instructions. Make sure you follow them!

#### 2. Allow Homebrew to start and stop the Postgres service

PostgreSQL is a database management service. It runs like a server 'in the background' – that is, it can start when your computer starts and won't lock up a terminal window. By default, this can be difficult on some Macs. To avoid this pain, enter the following command into the Terminal:

```shell
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

#### 3. Create the databases and tables

In order to start the app you will need to create the databases that the server will connect to. To do this you can use a helpful script which has been defined in the package.json file. Simply run ```npm run buildDB```. This should create both a development and test database called mailbox and testmailbox. It will also create a table called mail inside each of these databases and seed some starter data.

### How to use

#### Hosted database path

If you chose to host your own database then, once you have correctly installed and set up the necessary dependencies, you can run the app from the command line. Before you do so you will need to set up the port and host which can be found in the config.js file. App.js runs the app using the 'production' config so you will need to change the port and host to match your desired setting. It is recommended to leave the port number as it is, unless you have another process running on that port. The host address can be set to your local host IPv4 or your local network IPv4 address. In most cases your local host will be '127.0.0.1'. To find you local network IPv4 address you will need to follow the following steps.

1. Open System Preferences using the Apple menu at the top lefthand corner of your screen.
2. Click on the icon labeled Network.
3. Click on the Advanced button. This should open up a new window with a series of options. Select TCP/IP and the required information will be labelled IPv4 Address.

##### Starting the app

Once you have updated the config.js file then you should be ready to start the server. Using the command line enter ```npm start``` and you should see ```Server started```.

#### Local database path

If you are using a local database then you can start the app as follows.

```
$ node
> const POPServer = require('../lib/popServer')
> let server = new POPServer()
> server.start()
```
You should see ```Server started```.

#### Connecting

The server should now be up and running and you can test it out by opening up another terminal window and using a TCP/UDP connection tool such as Netcat or Telnet. We will use Netcat instructions to demonstrate.

In the new terminal window enter the following commands.

```
$ nc <Host> <Port>
HELLO
```
If the server is up and running properly you should see ```250``` returned to you. Try playing with other commands and see what comes back. The recognised commands should be *USER <username>, MessageRequest & QUIT*.

## Approach

### Methodology

The aim for the project was to understand how email worked in greater detail. The high level goals were to have code that was understandable, well encapsulated and easy to extend. We took and Object Oriented Programming (OOP) approach and, although there are still plenty of areas we would like to improve if given the time, we tried to keep to Single Responsibility Principle. This particular repository represents just the POP Server element of the project and more information about the project as a whole can be found [here](https://github.com/charmalt/final-project-main).

The following diagram shows the relationships between the objects as well as their properties and public methods.

![Imgur](https://i.imgur.com/mHMH7OV.jpg)

### Technologies

The project was written using Javascript with ES6 syntax. This language was selected as the most suitable for the team based on its growing popularity, level of familiarity across all team members and interesting challenges around asynchronous behaviour. We used Jest as the testing framework and ESLint for code style.

## Testing

### Testing Approach

We took a test-driven development (TDD) approach to this project with extensive unit testing to ensure our code was behaving as we intended. We isolated our test objects using Jest's in-build mocking capabilities. We made sure to mock out any imported libraries as these should have been tested by the library developers.

Certain key interfaces such as database connection and connecting to clients were tested using feature tests. One area for improvement would be to have more feature tests as this would have helped identify some issues with functionality at an earlier stage.

### Running the tests

If you have followed the earlier steps to set up your local databases then you can run the tests using the command ```npm run testLocal```. This should rebuild your databases prior to starting the tests in case you have altered any data. If the tests run successfully you should see an output similar to the image below.

![Imgur](https://i.imgur.com/4ArdmNU.png)

### Coverage

There are two feature tests with one checking that the Server can connect to the database and get messages using the interface and the other checking the ability for clients to connect to the server. There are also a number of unit tests for the classes that make up the application.

As the image above shows we have 100% test coverage except where there are alternative branches depending on environment. Although the overall figure of 100% is not always critical it was important in our case to have a high coverage as the majority of our code is our own and does not rely on external libraries or frameworks.

### Code Style

We used ESLint with Standard.js as the style guide.

## Deployment

This application was not deployed due to the fact that it required the hosting service to provide a static IP and port as well as a TCP connection so that clients could connect. We investigated hosting it on an Amazon EC2 instance however these challenges meant it would have taken too long to deploy and it was not a key requirement for the project.

## Further development

The main areas for improvement that we have identified are:

* Implementing the full POP3 handshake with PASSWORD
* Implementing a full user authentication service with user table in the database and hashed passwords (We developed some of this functionality but de-prioritised it.)
* Error handling on the server and within the POPClientHandshake
* Enforcing a strict ordering of commands within the handshake
* Simplifying the handshake to remove the if/else statement
* Using an options hash approach across all objects with a large number of arguments
* Making more of the methods private
* Further extraction and a more rigorous approach to SRP
* Simplifying our approach to mocking in the tests

## Contributing

We do not plan to develop this repository further so it is unlikely that we will respond to pull requests. If you do still feel a strong desire to contribute then please do so following the Github code of conduct for contributing [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Contributors

* **Ben Furber** - [Github Account](https://github.com/benfurber)
* **John Newman** - [Github Account](https://github.com/JohnNewman1)
* **Charlene Chetcuti** - [Github Account](https://github.com/charmalt)
* **Igor Ryabchuk** - [Github Account](https://github.com/nixlim)
* **George Sykes** - [Github Account](https://github.com/georgesykes86)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* All the coaches and staff at Makers Academy who pushed us to become better developers
* All the amazing brains who helped to make email and provided such an interesting challenge for us
