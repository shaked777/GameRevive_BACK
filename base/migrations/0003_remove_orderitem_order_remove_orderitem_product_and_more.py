# Generated by Django 4.1.7 on 2023-03-05 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='order',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
        migrations.DeleteModel(
            name='ShippingAddress',
        ),
    ]
