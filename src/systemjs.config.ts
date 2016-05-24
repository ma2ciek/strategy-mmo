declare var System: any;
{
    interface IPackages {
        [name: string]: IPackage;
    }

    interface IPackage {
        defaultExtension?: string;
        main?: string;
    }

    let packages: IPackages = {
        'browser': { defaultExtension: 'js' },
        'creator': { defaultExtension: 'js' },
        'shared': { defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };

    let packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/testing',
    ];

    packageNames.forEach((pkgName: string) => {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    System.config({
        map: {
            'socket.io': './lib/socket.io.js',
            'jquery': './lib/jquery-2.2.3.min.js',
            'lodash': './lib/lodash.js',
            '@angular': './lib/@angular',
            'rxjs': './lib/rxjs'
        },
        packages: packages
    });
}