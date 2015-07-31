using System;

namespace CookItNow.Parser.Utils
{
    internal interface ITimerDetector
    {
        bool IsTimer(string word);

        bool IsTimeQualifier(string part);

        string Timerify(int time, string word);
    }
}
