﻿using System;
using System.Threading.Tasks;

using E133.Business.Bases;
using E133.Business.Models;

namespace E133.Parser
{
    public interface IHtmlParser<TBase>
        where TBase : IBase, new()
    {
        bool IsRecipePage(Uri uri);

        Task<QuickRecipe> ParseHtmlAsync(Uri uri);
    }
}