using System;

namespace CookItNow.Parser.Utils
{
    internal class FrenchIngredientDetector : IIngredientDetector
    {
        public bool IsDeterminant(string word)
        {
            return word == "le" || word == "la" || word == "les" || word == "l'" || word == "l’";
        }
    }
}
