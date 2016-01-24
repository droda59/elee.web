using System.Diagnostics;

namespace CookItNow.Business.Models
{
    [DebuggerDisplay("{DebuggerDisplay}")]
    public abstract class Part
    {
        public abstract string Type { get; }

        internal abstract string DebuggerDisplay { get; }
    }
}