using System.Collections.Generic;

namespace CookItNow.Parser.LanguageUtilities
{
    internal interface ISubrecipeRepository
    {
        IDictionary<int, string> KnownSubrecipes { get; }
    }
}