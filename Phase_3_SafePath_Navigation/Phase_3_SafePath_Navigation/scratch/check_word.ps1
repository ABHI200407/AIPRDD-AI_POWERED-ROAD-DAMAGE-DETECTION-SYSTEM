try {
    $word = New-Object -ComObject Word.Application
    if ($word) {
        Write-Output "Word is installed"
        $word.Quit()
    } else {
        Write-Output "Word object is null"
    }
} catch {
    Write-Output "Word is NOT installed or error occurred: $_"
}
