/**
 * Megazord SDK module for automatic app generation.
 */
declare module Megazord {

  /**
   * Represents global configuration settings for a megazord application.
   */
  interface GlobalConfig {

    /**
     * The megazord-framework version to use. This will force dependency resolution to this version.
     */
    frameworkVersion: string,

    /**
     * The transition style to use for the application. Defaults to 'platform'
     * See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/ for other options.
     */
    transition? : string,

    /**
     * Whether or not to enable forward view caching. Defaults to <code>true</code>.
     */
    forwardCache? : boolean,

    /**
     * Whether or not to enable swipe to back gesture globally. Defaults to false.
     */
    swipeBack? : boolean,

    /**
     * The maximum number of views to cache. Defaults to <code>10</code>.
     */
    maxCache? : number,

    /**
     * A settings dictionary that will provide configuration options for global components in the application.
     */
    [componentName : string] : ComponentConfig
  }

  /**
   * Represents an event that is thrown by a screen. The object may have any additional values that are relevant
   * to the specific event type.
   */
  interface Event {
    /**
     * The name of the event.
     */
    name : string,

    /**
     * Any value parameters of the event.
     */
    params? : any
  }

  /**
   * Represents a component's configuration (WIP)
   */
  interface ComponentConfig {

  }

  /**
   * Represents the configuration of a data source for use in a given screen.
   *
   * This does not include any configuration that affects the data source globally.
   */
  interface DataSourceConfig {
    /**
     * Type of data source. The name must be in the form <code>repository#version</code>
     * where <code>repository</code> is the name of the data source's repository and <code>version</code> the branch or tag
     * of the data source.
     *
     * If different versions of the same data source are indicated throughout the metadata, the app
     * generation process will fail.
     */
    type: string,

    /**
     * Determines how to handle data load errors for this data source.
     */
    onError? : ErrorHandler,

    /**
     * Parameters to be passed to the data source. This will be received in the data source's getData method.
     * <b>This object must not close on anything outside of it.</b>
     *
     * Please refer to each data source's documentation on the specific parameters that each application receives.
     */
    params? : Object

    /**
     * Transformation function to apply to the data before it's passed to the screen.
     * This function will be injected with a <code>data</code> value, and may be optionally injected with any
     * service the megazord framework provides.
     *
     * <b>This function must not close on anything outside of it.</b>
     */
    outputTransform? : (...any) => any
  }

  /**
   * Represents a data connector configuration. A data connector is a data source that also accepts body parameters.
   * The way these parameters can be altered using the inputTransform function.
   */
  interface DataConnectorConfig extends DataSourceConfig {

    /**
     * The transformation to apply to the data before it is sent. You may inject any service required by your function
     * to operate on the data.
     *
     * You must inject <code>_data</code> to access the input values.
     *
     * This function <b>must not close on values outside of it</b>.
     * @param any Injected services or values
     */
    inputTransform? : (...any) => any

    /**
     * The event resolution to apply once the data has been retrieved. You may inject any service required by your function
     * to operate on the data.
     *
     * You may inject <code>_result</code> to access the data connector's output. This will be a promise that will fulfill
     * to the result of the data connector.
     *
     * You may inject <code>_event</code> to access the original event object.
     *
     * The function must return a promise of an <code>Event</code> object.
     *
     * This function <b>must not close on values outside of it</b>.
     *
     * @param any Injected services or values
     */
    resolveTransition?: (...any) => any
  }

  /**
   * Represents a list of data connectors to be applied to the events fired by a screen.
   */
  interface DataConnectorList {

    /**
     * The data connector to use for the corresponding named event.
     */
    [eventName : string] : DataConnectorConfig
  }
  /**
   * Defines how to handle data load errors.
   */
  interface ErrorHandler {

    /**
     * How the error must be resolved. It can be:
     * - <code>message</code>: Displays the error message indicated in <code>value</code>.
     * - <code>transition</code>: Sends the user to the state indicated in <code>value</code>.
     * - <code>function</code>: Executes the function indicated in <code>value</code>. This function can be injected with _error.
     */
    perform: string,

    /**
     * The value to execute the error resolution with. Must be a string if <code>perform</code> is either <code>message</code> or
     * <code>transition</code>, or a function if it's <code>function</code>.
     *
     * If this value is a function, <b>it must not close on anything outside of it.</b>
     */
    value: string|((...any) => any)
  }

  /**
   * Represents the application's language configuration.
   */
  interface LanguageConfig {
    /**
     * Defines the list of languages that will be supported in the application.
     *
     */
    available: Array<string>

    /**
     *
     */
    preferred: string
  }

  /**
   * Represents a router entry for a single screen.
   */
  interface RouterEntry {
    /**
     * Event to register in the screen's router entry.
     *
     * - <code>eventName</code>: Name of the event to register.
     * - <code>value</code>: Full name of the screen to transition to when the event occurs.
     */
    [eventName : string] : string
  }

  /**
   * Represents the application's router configuration.
   */
  interface RouterConfig {
    /**
     * Entries to be configured in the application's router.
     *
     * - <code>screenName</code>: Name of the screen to which the router entry will apply to.
     * - <code>value</code>: Router entry to register for the screen.
     */
    [screenName : string] : RouterEntry
  }

  /**
   * Represents a screen (be it either a container or a data screen) in the metadata.
   */
  interface Screen {
    /**
     * Type of the screen. The name must be in the form <code>repository#version</code>
     * where <code>repository</code> is the name of the screen's repository and <code>version</code> the branch or tag
     * of the screen.
     *
     * If different versions of the same screen are indicated throughout the metadata, the app
     * generation process will fail.
     */
    type: string,
    /**
     * Parameters to be passed to the screen. This object will be injected as <code>_screenParams</code>
     * in the screen's controller. <b>This object must not close on anything outside of it.</b>
     *
     * Please refer to each screen's documentation on the specific parameters that can be received by each
     * screen.
     */
    params?: Object,

    /**
     * The data source to be used for the screen.
     */
    dataSource? : DataSourceConfig,

    /**
     * Represents a list of data connectors to use for this screen's events.
     * Whenever the screen triggers an event indicated in this object, the corresponding data connector will be fired.
     * The user may then operate on the information returned by the connector, either canceling the event, continue with it,
     * provide error information or generate a new event.
     */
    dataConnectors? : DataConnectorList,
    /**
     * Indicates where in the parent screen this screen should be attached. This is useful when using multi-view screens.
     * Defaults to "" (the default container).
     */
    attachTo? : string,
  }

  /**
   * Represents a screen that may have child screens. This screen will produce an ui-router state, and as such,
   * can be navigated to using megazord's routing system.
   */
  interface ContainerScreen extends Screen {
    /**
     * Whether or not to clear the navigation history when the user navigates to this screen.
     *
     * If not indicated, defaults to <code>false</code>.
     */
    disableBack? : boolean,

    /**
     * Allows the user to indicate wether this screen should be abstract (i.e. it can't be navigated to). Defaults
     * to <code>false</code>.
     */
    abstract? : boolean,

    /**
     * Indicates the screens that will inherit (i.e. be wrapped by) this screen.
     *
     * The child screens will have the name of their parent prefixed. Hence if this screen's name is
     * <code>sample.screen</code>, a child declared as <code>child</code> will have a resulting name of
     * <code>sample.screen.child</code>.
     *
     * If this screen is not a container screen, this must be left unset.
     */
    childScreens? : ContainerScreenList,

    /**
     * Indicates the screens to embed on this screen. You will not be able to transition to these screens, as they will
     * not become states. Embedded screens cannot either have children or embedded screens themselves.
     */
    embeddedScreens? : [EmbeddedScreen]

  }

  /**
   * Represents a screen that will be embedded in another screen. The screen shares the same state as its parent, and it
   * cannot be navigated to (one must navigate to the parent). Embedded screens may not have child screens, but may
   * have additional embedded screens themselves.
   */
  interface EmbeddedScreen extends Screen {

  }

  /**
   * Represents a list of container screens.
   */
  interface ContainerScreenList {
    [screenName : string] : ContainerScreen
  }

}
