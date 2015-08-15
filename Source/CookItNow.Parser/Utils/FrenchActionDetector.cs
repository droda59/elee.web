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
            this._acceptedActions.Add("accompagner");
            this._acceptedActions.Add("ajouter");
            this._acceptedActions.Add("attendrir");
            this._acceptedActions.Add("battre");
            this._acceptedActions.Add("beurrer");
            this._acceptedActions.Add("bouillir");
            this._acceptedActions.Add("concasser");
            this._acceptedActions.Add("couvrir");
            this._acceptedActions.Add("cuire");
            this._acceptedActions.Add("défaire");
            this._acceptedActions.Add("déguster");
            this._acceptedActions.Add("déposer");
            this._acceptedActions.Add("dorer");
            this._acceptedActions.Add("égoutter");
            this._acceptedActions.Add("enrober");
            this._acceptedActions.Add("faire");
            this._acceptedActions.Add("fondre");
            this._acceptedActions.Add("fouetter");
            this._acceptedActions.Add("garnir");
            this._acceptedActions.Add("huiler");
            this._acceptedActions.Add("incorporer");
            this._acceptedActions.Add("laisser");
            this._acceptedActions.Add("mélanger");
            this._acceptedActions.Add("mijoter");
            this._acceptedActions.Add("napper");
            this._acceptedActions.Add("parsemer");
            this._acceptedActions.Add("placer");
            this._acceptedActions.Add("plonger");
            this._acceptedActions.Add("poivrer");
            this._acceptedActions.Add("porter");
            this._acceptedActions.Add("poursuivre");
            this._acceptedActions.Add("préchauffer");
            this._acceptedActions.Add("réchauffer");
            this._acceptedActions.Add("réduire");
            this._acceptedActions.Add("refermer");
            this._acceptedActions.Add("réfrigérer");
            this._acceptedActions.Add("refroidir");
            this._acceptedActions.Add("remuer");
            this._acceptedActions.Add("répartir");
            this._acceptedActions.Add("répéter");
            this._acceptedActions.Add("reposer");
            this._acceptedActions.Add("réserver");
            this._acceptedActions.Add("retourner");
            this._acceptedActions.Add("saler");
            this._acceptedActions.Add("servir");
            this._acceptedActions.Add("tiédir");
            this._acceptedActions.Add("tremper");
            this._acceptedActions.Add("verser");
        }

        public bool IsAction(string part)
        {
            if (part.EndsWith("er", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("ir", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("ire", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("tre", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("vre", StringComparison.OrdinalIgnoreCase)
                || part.EndsWith("dre", StringComparison.OrdinalIgnoreCase))
            {
                return this._acceptedActions.Contains(part, this._stringIgnoreCaseComparer);
            }

            return false;
        }

        public string Actionify(string word)
        {
            // TODO Prendre en considération le féminin
            // TODO Prendre en considération qu'on ne recevrait pas toujours un seul mot
            string action = null;
            if (word.EndsWith("é", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "er";
            }
            else if (word.EndsWith("i", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "ir";
            }
            else if (word.EndsWith("u", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "re";
            }

            return char.ToUpper(action[0]) + action.Substring(1);
        }
    }
}