This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and connects to Ruby on Rails backend.

![Wait Time Logo](http://imgur.com/Mbd3liX)
Format: !["Wait Time"](http://imgur.com/Mbd3liX)


## Table of Contents

-Summary/Basic Info
-Build Information
-Component Structure

## Summary/Basic Info

Wait Time is a user-driven app designed to provide useful feedback to customers and retail companies about the length of checkout lines.  The app allows for customers to time how long it takes to be served and to also provide immediate one-line feedback about the experience.  A user can view estimated and average wait times for a store, and see how their wait time stacks up against the norm (and if another store is typically faster).

In addition, the app includes map functionality that will allow a user to get a snapshot of estimated wait times in nearby stores.  Users will also be able to view specific store statistics.

## Build Information

This app uses a React.js front-end and a Ruby on Rails API back-end, utilizing JSON to communicate between ends.  

For the front-end, the main timing and recording functionality is built entirely from basic React components, and location data is obtained through WebAPI Geolocation.  The map does require the Google Maps API for functionalty.

The back-end uses a PostgreSQL database rending JSON as output.  One extra gem was needed, Geocoder, in order to handle latitude and longitude recording for converting store addresses to latitude and longitude.

![Landing Page](http://imgur.com/saNKr1n)
Format: !["Wait Time Landing Page"](http://imgur.com/saNKr1n)

![Map and User Pages](http://imgur.com/tZdJum5)
Format: !["Wait Time Map Page"](http://imgur.com/tZdJum5)

![Store Data Pge](http://imgur.com/6u4V90P)
Format: !["Wait Time Store Data"](http://imgur.com/6u4V90P)
