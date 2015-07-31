﻿using System;

namespace CookItNow.Parser.Utils
{
    internal class FrenchTimerDetector : ITimerDetector
    {
        public bool IsTimer(string word)
        {
            return word.StartsWith("PT", StringComparison.OrdinalIgnoreCase);
        }

        public bool IsTimeQualifier(string part)
        {
            if (part.StartsWith("seconde", StringComparison.OrdinalIgnoreCase) 
                || part.StartsWith("minute", StringComparison.OrdinalIgnoreCase) 
                || part.StartsWith("heure", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            return false;
        }

        public string Timerify(int time, string word)
        {
            return "PT" + time + GetTimeQualifier(word);
        }

        private static string GetTimeQualifier(string word)
        {
            if (word.StartsWith("seconde", StringComparison.OrdinalIgnoreCase))
            {
                return "S";
            }
            else if (word.StartsWith("minute", StringComparison.OrdinalIgnoreCase))
            {
                return "M";
            }
            else if (word.StartsWith("heure", StringComparison.OrdinalIgnoreCase))
            {
                return "H";
            }

            return string.Empty;
        }
    }
}
