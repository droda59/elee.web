using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace CookItNow.Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            container.RegisterType<IQuickRecipeRepository, LocalRepository>(new ContainerControlledLifetimeManager());

            CookItNow.Parser.UnityConfig.RegisterComponents(container);
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}