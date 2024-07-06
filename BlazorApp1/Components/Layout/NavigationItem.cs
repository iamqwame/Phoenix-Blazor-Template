
using Microsoft.AspNetCore.Components.Routing;
using System.Text.RegularExpressions;

namespace Qface.Erp.Frontend.Admin.Components.Layout
{
    public abstract record NavigationItem
    {
        public string Title { get; init; } = string.Empty;
        public string? Href { get; init; }
        public NavLinkMatch Match { get; init; } = NavLinkMatch.Prefix;
        public string Icon { get; init; } = "";
    }

    public record NavigationLink : NavigationItem
    {
        public NavigationLink(string? href,
            string icon,
            string title,
            NavLinkMatch match = NavLinkMatch.Prefix)
        {
            Href = href;
            Icon = icon;
            Title = title;
            Match = match;
        }
    }

    public record NavigationGroup : NavigationItem
    {
        public bool Expanded { get; init; }
        public string Gap { get; init; }
        public IReadOnlyList<NavigationItem> Children { get; }
        public string Id { get; set; }

        public NavigationGroup(string icon, string title, string gap, List<NavigationItem> children, bool expanded = false)
        {
            Href = null;
            Icon = icon;
            Title = title;
            Expanded = expanded;
            Gap = gap;
            Id = GenerateId(title);
            Children = children.AsReadOnly();
        }
        private string GenerateId(string title)
        {
            // Remove all non-alphabetic characters
            string id = Regex.Replace(title.ToLower(), @"[^a-z]", "");
            // Ensure the ID starts with "nav-"
            return $"nav-{id}";
        }
    }

}
