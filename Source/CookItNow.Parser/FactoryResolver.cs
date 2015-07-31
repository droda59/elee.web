using System;

using CookItNow.Parser.Utils;

using Microsoft.Practices.Unity;

namespace CookItNow.Parser
{
    internal static class FactoryResolver
    {
        public static Func<string, IActionDetector> ResolveActionDetectorByLanguage(IUnityContainer x)
        {
            // TODO Use CultureInfo object instead of string
            return language => language == "fr"
                ? x.Resolve<IActionDetector>(typeof(FrenchActionDetector).Name)
                : x.Resolve<IActionDetector>(typeof(ActionDetector).Name);
        }

        public static Func<string, ITimerDetector> ResolveTimerDetectorByLanguage(IUnityContainer x)
        {
            // TODO Use CultureInfo object instead of string
            return language => language == "fr"
                ? x.Resolve<ITimerDetector>(typeof(FrenchTimerDetector).Name)
                : x.Resolve<ITimerDetector>(typeof(TimerDetector).Name);
        }   
    }
}