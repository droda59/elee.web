using System;
using System.Globalization;

using Autofac;

namespace CookItNow.Parser
{
    internal static class FactoryResolver
    {
        public static Func<CultureInfo, TDetector> ResolveDetectorByLanguage<TDetector>(IComponentContext c)
        {
            var baseName = typeof(TDetector).Name.Remove(0, 1);

            return language => 
            {
                var context = c.Resolve<IComponentContext>();
                return context.ResolveKeyed<TDetector>(language.EnglishName + baseName);
            };
        }
    }
}