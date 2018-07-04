# RetroMail POP Server

A Javascript application that provides the core functionality of a POP3 mail server. The application implements a custom POP3 protocol to allow mail clients to request a users emails from a central database. It builds upon the [Net](https://nodejs.org/api/net.html#net_server_maxconnections) Node module which provides the network API for creating stream-based TCP or IPC servers and clients. The app can be run using node and will log server events such as clients connections, disconnections and the messages it receives from clients as part of the handshake.

## Specification

### Requirements

The primary requirement was to create a simple POP3 server that would implement a handshake with a mail client which would follow the following sequence

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
* A server that could accept client connections over TCP
* Implementation of the handshake shown above
* Ability to connect to a PostgreSQL database both locally and hosted in the cloud
* Ability to end client connections in the event of errors
* Logging of key server events (Client connections, client disconnections, messages from clients, server start & server close)

### Acceptance Criteria

* Server starts and logs start
* Server allows connections of client over TCP and logs it
* Server and client can exchange messages through the correct handshake sequence
* Only emails for the specified USER are returned
* Server connects with and can pull messages from a defined PostgresSQL database

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This requires Node to run it and npm as the package manager to simplify the build process and include all necessary dependencies. If you do not have Node installed it is recommended you do so ([Node](https://nodejs.org/en/download/)). To get started please follow the subsequent steps.

```
$ git clone https://github.com/charmalt/final-project-pop.git
$ cd <repo name>
$ npm install
```

#### How to use

The app can be run using the app.js file in the root however this will attempt to connect the server to a production database which in our case was a PostgresSQL database hosted on an AWS EC2 instance. If you would like to have a similar cloud hosted database then you will need to set this up yourself as this is beyond the scope of these instructions. If you choose to go down this root then you will also need to create a .env file in the root of the repository. You will then need to insert the database connection string into this file in a similar format to below.
```
// /.env

PGPROD="postgres://<USERNAME>:<PASSWORD>@<ADDRESS>:<PORT>/mailbox"
```

Once you have created this file then you can run the app from the command line as shown below and you should see ```Server started```.

```
$ node app.js
```

If you do not wish to set up a remote database then you can use a local instance of PostgreSQL. If you do not have Postgres set up on you computer already then you can follow these steps.

###### 1. Use Homebrew to install the package

We can use the package manager [Homebrew](https://docs.brew.sh/Installation) to start the install of PostgreSQL:

```sh
$> brew install postgresql
```

After Homebrew has downloaded PostgreSQL it will show you some installation instructions: follow them!

###### 2. Allow Homebrew to start and stop the Postgres service

PostgreSQL is a database management service. It runs like a server 'in the background' – that is, it can start when your computer starts and won't lock up a terminal window. By default, this can be difficult on some Macs. To avoid this pain, enter the following command into the Terminal:

```shell
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Approach

### Methodology

design patterns, UML key design practices

### Technologies


## Testing

### Testing Approach

### Running the tests

Explain how to run the automated tests for this system

### Coverage

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Further development

Some ideas for future improvement

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Contributors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
