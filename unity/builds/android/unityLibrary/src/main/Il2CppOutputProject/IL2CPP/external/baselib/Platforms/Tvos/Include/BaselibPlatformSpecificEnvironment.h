#pragma once

/*
namespace detail
{
    struct Semaphore
    {
        dispatch_semaphore_t handle;
        baselib::atomic<int32_t> counter;
    };
}
*/
enum { Baselib_SystemSemaphore_PlatformSize = 16 }; // Size should match size of struct above

#ifndef EXPORTED_SYMBOL
    #define EXPORTED_SYMBOL __attribute__((visibility("default")))
#endif
#ifndef IMPORTED_SYMBOL
    #define IMPORTED_SYMBOL
#endif

// Prohibited by apple
#ifndef PLATFORM_FUTEX_NATIVE_SUPPORT
    #define PLATFORM_FUTEX_NATIVE_SUPPORT 0
#endif

// Cache line size in bytes
#ifndef PLATFORM_CACHE_LINE_SIZE
    #define PLATFORM_CACHE_LINE_SIZE 64
#endif
