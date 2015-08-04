using System;
using System.Globalization;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    internal static class FactoryResolver
    {
        public static Func<CultureInfo, TDetector> ResolveDetectorByLanguage<TDetector>(IUnityContainer x)
        {
            var baseName = typeof(TDetector).Name.Remove(0, 1);

            return language => x.Resolve<TDetector>(language.EnglishName + baseName);
        }
    }
}