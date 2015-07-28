using System;

using CookItNow.Parser.Utils;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    public class UnityConfig
    {
        public static void RegisterComponents(IUnityContainer container)
        {
            container.RegisterType<IHtmlLoader, HtmlLoader>(new ContainerControlledLifetimeManager());
            container.RegisterType<IParserFactory, ParserFactory>(new ContainerControlledLifetimeManager());
            
            container.RegisterType<FrenchActionDetector>(new ContainerControlledLifetimeManager());

            container.RegisterType<IActionDetector>(new InjectionFactory(
                (x, y, z) =>
                    {
                        if (z == "fr")
                        {
                            return x.Resolve<FrenchActionDetector>();
                        }

                        return x.Resolve<FrenchActionDetector>();
                    }));

            container.RegisterType<IHtmlParser, RicardoParser>(typeof(RicardoParser).Name, new ContainerControlledLifetimeManager());
        }
    }
}
