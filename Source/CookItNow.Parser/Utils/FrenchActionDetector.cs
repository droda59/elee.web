using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;

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

            var path = HostingEnvironment.MapPath(@"/Resources/FrenchVerbs.txt");
            using (var reader = new StreamReader(path))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    this._acceptedActions.Add(line);
                }
            }
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
            // TODO Prendre en considération qu'on ne recevrait pas toujours un seul mot
            string action = null;
            if (word.EndsWith("é", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("és", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ée", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ées", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "er";
            }
            else if (word.EndsWith("i", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("is", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ie", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ies", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "ir";
            }
            else if (word.EndsWith("u", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("us", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ue", StringComparison.OrdinalIgnoreCase)
                || word.EndsWith("ues", StringComparison.OrdinalIgnoreCase))
            {
                action = word.Substring(0, word.Length - 1) + "re";
            }
            else
            {
                return word;
            }

            return char.ToUpper(action[0]) + action.Substring(1);
        }
    }
}