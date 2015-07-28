using System;

namespace CookItNow.Parser.Utils
{
    internal class ActionDetector : IActionDetector
    {
        public bool IsAction(string part)
        {
            return false;
        }

        public string Actionify(string word)
        {
            return word;
        }
    }
}
