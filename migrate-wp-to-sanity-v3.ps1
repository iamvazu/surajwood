# Migration Script v3: Single-line replacements for PowerShell

$workspaceRoot = "c:\Users\dell\Desktop\surajwood\surajwood-frontend"

Write-Host "Migrating imports in app/ and components/..."
$files = Get-ChildItem -Path (Join-Path $workspaceRoot "app"), (Join-Path $workspaceRoot "components") -Recurse -Filter "*.ts*"

foreach ($file in $files) {
    if ($file.Attributes -and [System.IO.FileAttributes]::Directory) { continue }
    
    $filePath = $file.FullName
    $content = Get-Content $filePath -Raw
    
    # All on one line for PowerShell safety
    $newContent = $content.Replace("@/lib/wordpress", "@/lib/sanity").Replace("@/types/wordpress", "@/types/sanity").Replace("WPProduct", "SanityProduct").Replace("WPApplication", "SanityApplication").Replace("WPTestimonial", "SanityTestimonial").Replace("WPFAQ", "SanityFAQ").Replace("WPPost", "SanityPost").Replace("WPMedia", "SanityImage").Replace("WPHomepageData", "HomepageData")
    
    if ($newContent -ne $content) {
        Set-Content $filePath $newContent -NoNewline
        Write-Host "Migrated: $($file.Name)"
    }
}

Write-Host "Migration Complete!"
