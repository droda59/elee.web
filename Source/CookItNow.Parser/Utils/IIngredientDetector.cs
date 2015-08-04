using System;

namespace CookItNow.Parser.Utils
{
    internal interface IIngredientDetector
    {
        // TODO Find right word
        bool IsDeterminant(string word);
    }
}