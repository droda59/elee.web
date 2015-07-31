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

            container.RegisterType<IActionDetector, FrenchActionDetector>(typeof(FrenchActionDetector).Name, new ContainerControlledLifetimeManager());
            container.RegisterType<IActionDetector, ActionDetector>(typeof(ActionDetector).Name, new ContainerControlledLifetimeManager());

            container.RegisterType<Func<string, IActionDetector>>(
                new ContainerControlledLifetimeManager(),
                new InjectionFactory(FactoryResolver.ResolveActionDetectorByLanguage));

            container.RegisterType<ITimerDetector, FrenchTimerDetector>(typeof(FrenchTimerDetector).Name, new ContainerControlledLifetimeManager());
            container.RegisterType<ITimerDetector, TimerDetector>(typeof(TimerDetector).Name, new ContainerControlledLifetimeManager());

            container.RegisterType<Func<string, ITimerDetector>>(
                new ContainerControlledLifetimeManager(),
                new InjectionFactory(FactoryResolver.ResolveTimerDetectorByLanguage));

            container.RegisterType<IHtmlParser, RicardoParser>(typeof(RicardoParser).Name, new ContainerControlledLifetimeManager());
        }

    }
}
