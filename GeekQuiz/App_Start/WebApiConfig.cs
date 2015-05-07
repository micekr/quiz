using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

// added per the tutorial 4-3-15 Rob
using Newtonsoft.Json.Serialization;

namespace GeekQuiz
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services


            // Rob
            /*
             * Note: 
             * 
             * The CamelCasePropertyNamesContractResolver automatically 
             * converts property names to camel case, which is the general 
             * convention for property names in JavaScript.
            
            */
            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();



            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
