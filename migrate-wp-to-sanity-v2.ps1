# Migration Script v2: Replace imports using direct Replace method

$workspaceRoot = "c:\Users\dell\Desktop\surajwood\surajwood-frontend"

Write-Host "Migrating imports in app/ and components/..."
$files = Get-ChildItem -Path (Join-Path $workspaceRoot "app"), (Join-Path $workspaceRoot "components") -Recurse -Filter "*.ts*"

foreach ($file in $files) {
    if ($file.Attributes -and [System.IO.FileAttributes]::Directory) { continue }
    
    $filePath = $file.FullName
    $content = Get-Content $filePath -Raw
    
    # Direct string replacements (no regex)
    $newContent = $content.Replace("@/lib/wordpress", "@/lib/sanity") `
                          .Replace("@/types/wordpress", "@/types/sanity") `
                          .Replace("WPProduct", "SanityProduct") `
                          .Replace("WPApplication", "SanityApplication") `
                          .Replace("WPTestimonial", "SanityTestimonial") `
                          .Replace("WPFAQ", "SanityFAQ") `
                          .Replace("WPPost", "SanityPost") `
                          .Replace("WPMedia", "SanityImage") `
                          .Replace("WPHomepageData", "HomepageData")
    
    if ($newContent -ne $content) {
        Set-Content $filePath $newContent
        Write-Host "Migrated: $($file.Name)"
    }
}

Write-Host "Migration Complete!"
