using System;
using System.Collections.Generic;
using System.Globalization;

using CookItNow.Parser.Utils;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    public class UnityConfig
    {
        private static readonly IEnumerable<CultureInfo> _supportedCultures = new List<CultureInfo>
        {
            CultureInfo.GetCultureInfoByIetfLanguageTag("fr"),
            CultureInfo.GetCultureInfoByIetfLanguageTag("en")
        };

        public static void RegisterComponents(IUnityContainer container)
        {
            container.RegisterType<IHtmlLoader, HtmlLoader>(new ContainerControlledLifetimeManager());
            container.RegisterType<IParserFactory, ParserFactory>(new ContainerControlledLifetimeManager());

            RegisterDetector<IActionDetector>(container);
            RegisterDetector<ITimerDetector>(container);
            RegisterDetector<IIngredientDetector>(container);
            RegisterDetector<IMeasureUnitDetector>(container);

            container.RegisterType<IHtmlParser, RicardoParser>(typeof(RicardoParser).Name, new ContainerControlledLifetimeManager());
        }

        private static void RegisterDetector<TDetector>(IUnityContainer container)
        {
            var typeFrom = typeof(TDetector);
            var baseName = typeFrom.Name.Remove(0, 1);
            var @namespace = typeFrom.Namespace;
            
            foreach (var supportedCulture in _supportedCultures)
            {
                var type = Type.GetType(@namespace + "." + supportedCulture.EnglishName + baseName);
                container.RegisterType(typeFrom, type, supportedCulture.EnglishName + baseName, new ContainerControlledLifetimeManager());
            }

            container.RegisterType<Func<CultureInfo, TDetector>>(
                new ContainerControlledLifetimeManager(),
                new InjectionFactory(FactoryResolver.ResolveDetectorByLanguage<TDetector>));
        }
    }
}
