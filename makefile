NAME=cjournal

VER := $(shell cat package.json | grep \"version\": | cut -d'"' -f 4)

apk:
	mkdir -p release
	cp android/app/build/outputs/apk/release/app-release.apk "./release/cjournal$(VER).apk"

aab:
	echo $(VER)

pods: 
	cd ios && pod install && cd ..

clean:
	rm -rf node_nodules
	rm -rf android/build

install:
	yarn install

reinstall:
	rm -rf node_nodules && yarn install
