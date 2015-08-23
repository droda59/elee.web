using System;
using System.Collections.Generic;

namespace CookItNow.Parser.LanguageUtilities.French
{
    internal class FrenchSubrecipeRepository : SubrecipeRepository, ISubrecipeRepository
    {
        public readonly IDictionary<int, string> _knownSubrecipes;

        public FrenchSubrecipeRepository()
        {
            this._knownSubrecipes = new Dictionary<int, string>
            {
                { RequirementsSubrecipeId, "Requis"},
                { PreparationSubrecipeId, "Préparation"}
            };
        }

        public override IDictionary<int, string> KnownSubrecipes
        {
            get { return this._knownSubrecipes; } 
        }
    }
}
