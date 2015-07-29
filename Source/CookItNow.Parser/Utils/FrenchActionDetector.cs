using System;
using System.Collections.Generic;
using System.Linq;

namespace CookItNow.Parser.Utils
{
    internal class FrenchActionDetector : IActionDetector
    {
        private readonly HashSet<string> _acceptedActions;
        private readonly StringIgnoreCaseComparer _stringIgnoreCaseComparer;

        public FrenchActionDetector()
        {
            this._stringIgnoreCaseComparer = new StringIgnoreCaseComparer();

            this._acceptedActions = new HashSet<string>();
            this._acceptedActions.Add("ajouter");
            this._acceptedActions.Add("battre");
            this._acceptedActions.Add("beurrer");
            this._acceptedActions.Add("bouillir");
            this._acceptedActions.Add("cuire");
            this._acceptedActions.Add("d�guster");
            this._acceptedActions.Add("faire");
            this._acceptedActions.Add("fouetter");
            this._acceptedActions.Add("incorporer");
            this._acceptedActions.Add("laisser");
            this._acceptedActions.Add("m�langer");
            this._acceptedActions.Add("parsemer");
            this._acceptedActions.Add("placer");
            this._acceptedActions.Add("porter");
            this._acceptedActions.Add("pr�chauffer");
            this._acceptedActions.Add("r�chauffer");
            this._acceptedActions.Add("refermer");
            this._acceptedActions.Add("remuer");
            this._acceptedActions.Add("r�partir");
            this._acceptedActions.Add("r�p�ter");
            this._acceptedActions.Add("reposer");
            this._acceptedActions.Add("r�server");
            this._acceptedActions.Add("servir");
            this._acceptedActions.Add("ti�dir");
            this._acceptedActions.Add("verser");
        }

        public bool IsAction(string part)
        {
            if (part.EndsWith("er", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("ir", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("ire", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("tre", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("dre", StringComparison.OrdinalIgnoreCase))
            {
                return this._acceptedActions.Contains(part, this._stringIgnoreCaseComparer);
            }

            return false;
        }

        public string Actionify(string word)
        {
            return word + "er";
        }
    }
}