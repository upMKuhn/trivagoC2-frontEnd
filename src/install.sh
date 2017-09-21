

sudo apt-get install apache2
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
sudo apt-get update



git clone https://github.com/upMKuhn/trivagoC2.git
php bin/symfony_requirements
composer install --no-dev --optimize-autoloader
php bin/console doctrine:migrations:execute 1
php bin/console cache:clear --env=prod --no-debug --no-warmup
php bin/console cache:warmup --env=prod
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/example.com.conf
 

