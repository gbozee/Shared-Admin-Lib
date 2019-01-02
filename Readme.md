## Tuteria Admin Shared Library
https://tuteria-systems.now.sh
----

The sole purpose of this library is to provide a shared interface through with the different admin [React](React) applications can hook into. 

The functionalities provided by this library can be broken down into the following

1. Shared styling system using [Emotion]()
2. Login and authentication logic using [Firebase]()
3. Shared primitive components used throughout the building of the mini admin apps.

In order for applications to leverage the [Provider]() provided by the library, the following props are required

1. **An Adapter module**: This is the part of the library that is responsible for making api calls. functions provided by this module are used in the dispatch functions mapped to actions. 
2. **A Context module**: The context module exposes the following properties as default exports
  
    *  **dispatch**: A function that maps a series of actions to its implementations. Somewhat similar to [Redux]() 
    * **actions**: An object representing the possible actions that would be carried out by the application. Makes use of a similar api exposed by [Redux]()
    * **componentDidMount**: A function which is called on the `componentDidMount` lifecycle, for the [DataProvider](./src/shared/DataProvider.js)
    * **state**: any additional state that should be accounted for by the [DataProvider](./src/shared/DataProvider.js). By default the `agent` field is available since only agents would be using the apps built.
    * **keys**: this is an object consisting of what the `analytics` name and `storage` name, should be used by [Firebase]() when saving data for a particular agent, based on the admin application. It is mostely used by [backupFirebase.js](./src/shared/adapters/backupFirebase.js)


