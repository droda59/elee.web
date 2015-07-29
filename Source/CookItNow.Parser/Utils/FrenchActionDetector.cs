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
            this._acceptedActions.Add("déguster");
            this._acceptedActions.Add("faire");
            this._acceptedActions.Add("fouetter");
            this._acceptedActions.Add("incorporer");
            this._acceptedActions.Add("laisser");
            this._acceptedActions.Add("mélanger");
            this._acceptedActions.Add("parsemer");
            this._acceptedActions.Add("placer");
            this._acceptedActions.Add("porter");
            this._acceptedActions.Add("préchauffer");
            this._acceptedActions.Add("réchauffer");
            this._acceptedActions.Add("refermer");
            this._acceptedActions.Add("remuer");
            this._acceptedActions.Add("répartir");
            this._acceptedActions.Add("répéter");
            this._acceptedActions.Add("reposer");
            this._acceptedActions.Add("réserver");
            this._acceptedActions.Add("servir");
            this._acceptedActions.Add("tiédir");
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