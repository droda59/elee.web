using System;

namespace CookItNow.Parser.Utils
{
    internal interface IIngredientDetector
    {
        bool IsDeterminant(string word);
    }
}