using System;

namespace CookItNow.Parser.Utils
{
    internal class TimerDetector : ITimerDetector
    {
        public bool IsTimer(string word)
        {
            return false;
        }

        public bool IsTimeQualifier(string part)
        {
            return false;
        }

        public string Timerify(int time, string word)
        {
            return word;
        }
    }
}
