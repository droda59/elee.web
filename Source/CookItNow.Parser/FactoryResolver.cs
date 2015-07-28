using System;

using CookItNow.Parser.Utils;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    internal static class FactoryResolver
    {
        public static Func<string, IActionDetector> ResolveByLanguage(IUnityContainer x)
        {
            return language => language == "fr"
                ? x.Resolve<IActionDetector>(typeof(FrenchActionDetector).Name)
                : x.Resolve<IActionDetector>(typeof(ActionDetector).Name);
        }   
    }
}