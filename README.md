# Mnemerender
A minimalistic library for defining components and rendering them imperatively. The library tries to take a fully functional approach, and delays the implementation of any state information until the last stage.


## Usage

### 1. Component definition
Create a file for the component. Implement the following functionality in it:
- Collection type of functions that will be available in the post-render script (For example, SomeComponentActions).
- Component storage entry type (For example, SomeComponentParams).
- Function for rendering a component of type MnemeTemplateFunc<...>.
- CSS production function for a component of type MnemeProduceCSSFunc.
- A postRender script execution function, of type MnemePostRenderAgnosticFunc<...>.

### 2. Create a vault
Create a repository description file for the new component. Implement the following functionality in it:
- The structure of the storage, and the way information is stored. The storage should contain: a collection of records, according to which a set of components will be drawn, the component's gnostic data (of the MnemeComponentGnosticDat<...> type) and a name.
- Ways to initialize and update storage.
- A way to get a Storage Controller from a shared state. A store controller (of type MnemeComponentsCollectionContoller<...>) is an abstraction that allows you to wrap any type of store. Rendering of components is implemented through it.

### 3. Write an application script
Create a file that describes how your application is built and how it works. It must contain:
- Type describing the entire state of the application (all stores).
- Initialization of local storages.
- The logic of building a common css block of the page, based on the css constructors of all components.
- Application initialization script:
    - Starting data for storages are determined.
    - Gnostic data blocks are created, from component agnostic descriptions made earlier. This is done using the initComponent function, which supplements the component's Agnostic declaration with specific implementations of the actions described earlier for it, and a qury-selector getter function to find blocks where the component will be drawn.
    - Initial render is called.


## Examples
- You can find the source code of the Example in the /ts/test-app folder
- The compiled code of the example is located in the /acc-test folder


## License
MIT


## Author
Anatoly "Pantagruel74" Starodubtsev 
tostar74@mail.ru