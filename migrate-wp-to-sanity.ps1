# Migration Script: WordPress to Sanity

$workspaceRoot = "c:\Users\dell\Desktop\surajwood\surajwood-frontend"

# 1. Update .env.local with revalidation secret
$envFile = Join-Path $workspaceRoot ".env.local"
if (Test-Path $envFile) {
    $content = Get-Content $envFile -Raw
    if ($content -notmatch "SANITY_REVALIDATION_SECRET") {
        $content += "`n# Sanity Revalidation Secret`nSANITY_REVALIDATION_SECRET=change-this-to-a-secure-random-string`n"
        Set-Content $envFile $content
        Write-Host "Updated .env.local with SANITY_REVALIDATION_SECRET"
    }
}

# 2. Update api/revalidate/route.ts
$routeFile = Join-Path $workspaceRoot "app\api\revalidate\route.ts"
if (Test-Path $routeFile) {
    (Get-Content $routeFile) | ForEach-Object {
        $_ -replace "WP_REVALIDATION_SECRET", "SANITY_REVALIDATION_SECRET" `
           -replace "Webhook called by WordPress", "Webhook called by Sanity"
    } | Set-Content $routeFile
    Write-Host "Updated app/api/revalidate/route.ts"
}

# 3. Update all page imports and types
Write-Host "Migrating imports in app/ and components/..."
$files = Get-ChildItem -Path (Join-Path $workspaceRoot "app"), (Join-Path $workspaceRoot "components") -Recurse -Filter "*.ts*"

foreach ($file in $files) {
    if ($file.Attributes -and [System.IO.FileAttributes]::Directory) { continue }
    
    $filePath = $file.FullName
    $content = Get-Content $filePath -Raw
    
    if ($content -match "@[/\\](lib|types)[/\\]wordpress") {
        # Update imports
        $content = $content -replace "@/(lib|types)/wordpress", "@/`$1/sanity"
        
        # Update type names for cleanliness (WPProduct -> SanityProduct, etc.)
        $content = $content -replace "WPProduct", "SanityProduct"
        $content = $content -replace "WPApplication", "SanityApplication"
        $content = $content -replace "WPTestimonial", "SanityTestimonial"
        $content = $content -replace "WPFAQ", "SanityFAQ"
        $content = $content -replace "WPPost", "SanityPost"
        $content = $content -replace "WPMedia", "SanityImage"
        $content = $content -replace "WPHomepageData", "HomepageData"
        
        Set-Content $filePath $content
        Write-Host "Migrated: $($file.Name)"
    }
}

# 4. Delete old wordpress.ts files
$libWp = Join-Path $workspaceRoot "lib\wordpress.ts"
$typesWp = Join-Path $workspaceRoot "types\wordpress.ts"

if (Test-Path $libWp) {
    Remove-Item $libWp -Force
    Write-Host "Deleted lib/wordpress.ts"
}

if (Test-Path $typesWp) {
    Remove-Item $typesWp -Force
    Write-Host "Deleted types/wordpress.ts"
}

Write-Host "Migration Complete!"
