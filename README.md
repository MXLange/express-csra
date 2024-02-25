# express-csra

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## Description

This project is a CLI that aims to quickly implement an express.js project.

The CLI allows you to create a standard CSRA, Controller, Service, Repository and API project.

## Details

These dependencies will be installed when starting the project:

<ul>
    <li style="color:#D2691E">express</li>
    <li style="color:#D2691E">express-async-errors</li>
    <li style="color:#D2691E">dotenv</li>
    <li style="color:#D2691E">cors</li>
</ul>

We also have some dev dependencies:

<ul>
    <li style="color:#D2691E">nodemon</li>
</ul>

## Installation

The installation of the package must be done globally:

<span style="color:#00BFFF">npm install -g express-csra</span>

## Usage

At this version we have two commands available:

1# <span style="color:#00BFFF">csra make -n \<project-name\></span>, when running this command the project will be inicialized.

2#
<span style="color:#00BFFF">csra makeEntity -n \<entity-name\></span>, <span style="color:#00FF00">this command must be run inside project directoy</span>. When running this command a new entity will be generated inside domains directory.

3#
<span style="color:#00BFFF">csra insert -t \<entity-name\></span>, <span style="color:#00FF00">this command must be run inside project directoy</span>. When running this command you'll be able to install some features to your API. For now you can try:

<span style="color:#00BFFF">csra insert -t jwtAuth</span>, a login route, middleware and class will be added to your project.
<span style="color:#00BFFF">csra insert -t axiosInstance</span>, a axios instance will be added to your shared folder. (shared/connections/axios)

## Contributing

Comming soon...

## License

This project is licensed under the ISC License.

If you have any questions or want to collaborate, feel free to reach out to me at [lange_sp@hotmail.com](mailto:email@example.com).


