using System;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    public class UnityConfig
    {
        public static void RegisterComponents(IUnityContainer container)
        {
            container.RegisterType<IHtmlLoader, HtmlLoader>(new ContainerControlledLifetimeManager());
            container.RegisterType<IParserFactory, ParserFactory>(new ContainerControlledLifetimeManager());

            container.RegisterType<IHtmlParser, RicardoParser>(typeof(RicardoParser).Name, new ContainerControlledLifetimeManager());
        }
    }
}
