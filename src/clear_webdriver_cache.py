import os
import shutil

def clear_webdriver_cache():
    cache_dirs = [
        os.path.expanduser("~/.wdm"),
        os.path.expanduser("~/.cache/selenium"),
        os.path.expanduser("~/webdriver_manager")
    ]
    for cache_dir in cache_dirs:
        if os.path.exists(cache_dir):
            try:
                shutil.rmtree(cache_dir)
                print(f"Deleted cache directory: {cache_dir}")
            except OSError as e:
                print(f"Error deleting cache directory {cache_dir}: {e}")

if __name__ == "__main__":
    clear_webdriver_cache()
